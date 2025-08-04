import { apply, applyTemplates, chain, MergeStrategy, mergeWith, move, Rule, SchematicContext, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { join, normalize } from 'path';
import { getWorkspace } from '@schematics/angular/utility/workspace';


export async function setupOptions(host: Tree, options: any): Promise<Tree> {
  const workspace = await getWorkspace(host);
  if (!options.project) {
    options.project = workspace.projects.keys().next().value;
  }
  const project = workspace.projects.get(options.project);
  if (!project) {
    throw new SchematicsException(`Invalid project name: ${options.project}`);
  }
  
  options.path = join(normalize(project.root), 'src');
  return host;
}

export function updateFileGlobalScss(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const globalScssPath = 'src/global.scss';
    
    if (!tree.exists(globalScssPath)) {
      throw new Error(`Файл ${globalScssPath} не существует.`);
    }
    
    const content = tree.read(globalScssPath)?.toString('utf-8') || '';
    const importToAdd = '@use "./assets/scss/reset" as *;\n@use "./src/theme/colors.scss" as *;\n';
    
    
    if (content.includes(importToAdd.trim())) {
      context.logger.info(`${globalScssPath} уже содержит @use.`);
      return tree;
    }
    
    const updatedContent = importToAdd + content;
    tree.overwrite(globalScssPath, updatedContent);
    
    return tree;
  }
}

function deleteFiles(tree: Tree, folderPath: string, _context: SchematicContext): void {
  // console.log(`EXITS `, tree.exists('src')); // tree.getDir('src/app').subfiles);
  // Проверяем существует ли путь
  if (tree.getDir(folderPath)) {
    try {
      // Получаем все файлы в директории рекурсивно
      const dir = tree.getDir(folderPath);
      const hasContent = dir.subdirs.length > 0 || dir.subfiles.length > 0;
      if (hasContent) {
        dir.subfiles.forEach((file) => tree.delete(`${folderPath}${file}`));         
        _context.logger.info(`Папка ${folderPath} успешно удалена со всем содержимым`);
      } else {
        // Если папка пустая, просто удаляем
        tree.delete(folderPath);
        _context.logger.info(`Пустая папка ${folderPath} удалена`);
      }
      tree.delete(folderPath);
    } catch (error) {
      _context.logger.warn(`Ошибка при удалении папки ${folderPath}: ${error}`);
    }
  } else {
    _context.logger.info(`Папка ${folderPath} не существует`);
  }  
}

export function deleteFolder(_options: any, _context: SchematicContext): Rule {
  return (tree: Tree) => {
    deleteFiles(tree, 'src/app/tab1/', _context);
    deleteFiles(tree, 'src/app/tab2/', _context);
    deleteFiles(tree, 'src/app/tab3/', _context);
    deleteFiles(tree, 'src/app/tabs/', _context);
    deleteFiles(tree, 'src/app/explore-container/', _context);
  }
}

export function ionicStructureSchematic(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    await setupOptions(tree, _options);
    
    const movePath = normalize(_options.path + '/');
    const templateSource = apply(url('./files/src'), [
      applyTemplates({ ..._options }),
      move(movePath)
    ]);
    return chain([
      deleteFolder(_options, _context),
      updateFileGlobalScss(),
      mergeWith(templateSource, MergeStrategy.Overwrite),
    ]);
  };
}
