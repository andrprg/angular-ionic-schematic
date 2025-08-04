import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('ionic-structure-schematic', () => {
  const testRunner = new SchematicTestRunner('schematics', collectionPath);
  let appTree: UnitTestTree;
  
  beforeEach(() => {
    // Создаём "чистое" дерево (виртуальную ФС)
    appTree = new UnitTestTree(Tree.empty());
    
    // Добавляем angular.json
    appTree.create(
      '/angular.json',
      JSON.stringify({
        $schema: './node_modules/@angular/cli/lib/config/schema.json',
        version: 1,
        newProjectRoot: 'projects',
        projects: {
          myApp: {
            root: '',
            sourceRoot: 'src',
            projectType: 'application',
            prefix: 'app',
            schematics: {},
            architect: {},
          },
        }
      })
    );

    // Добавляем файл global.scss
    appTree.create('src/global.scss', '');    

    // Добавляем файл main.ts
    appTree.create('src/main.ts', '');        

    // Можно добавить package.json
    appTree.create('/package.json', JSON.stringify({}));
  });
  
  it('Должны быть добавлены файлы', async () => {
    const resultTree = await testRunner.runSchematic('ionic-structure', {}, appTree);
    
    // Проверяем, существует ли файл
    expect(resultTree.files).toContain('/src/main.ts');    
    expect(resultTree.files).toContain('/src/app/data/datasource/api-common.service.ts');    
    expect(resultTree.files).toContain('/src/app/data/interceptors/loading.interceptor.ts');         
  });

  it('должны быть добавлены @use в файл global.scss', async () => {
    const initialContent = '@use "./assets/scss/reset" as *;\n@use "./src/theme/colors.scss" as *;\n';

    const resultTree = await testRunner.runSchematic('ionic-structure', {}, appTree);
    const content = resultTree.readContent('src/global.scss');
    expect(content).toBe(initialContent);
  });  

  it('должны быть добавлен интерсептор в файл main.ts', async () => {
    const loadingInterceptor = 'provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: tru';
    // const baseUrlInterceptor = 'provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true';

    const resultTree = await testRunner.runSchematic('ionic-structure', {}, appTree);
    const content = resultTree.readContent('src/main.ts');
    expect(content).toContain(loadingInterceptor);
    // expect(content).toContain(baseUrlInterceptor);
  });  

  it('должны быть удалены папки', async () => {
    appTree.create('src/app/tab1/tab1.page.ts', '');    
    appTree.create('src/app/tab1/tab1.page.html', '');    
    appTree.create('src/app/tab2/tab2.page.ts', '');    
    appTree.create('src/app/tab2/tab2.page.html', '');    

    appTree.create('src/app/test.ts', '');    
    const resultTree = await testRunner.runSchematic('ionic-structure', {}, appTree);
    expect(resultTree.exists('src/app/tab1/tab1.page.ts')).toBe(false);
    expect(resultTree.exists('src/app/tab1/tab1.page.html')).toBe(false);
    expect(resultTree.exists('src/app/tab2/tab2.page.ts')).toBe(false);
    expect(resultTree.exists('src/app/tab2/tab2.page.html')).toBe(false);    
    expect(resultTree.exists('src/app/test.ts')).toBe(true);
  });  


});
