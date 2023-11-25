import { EntityService } from "src/app/core/services/entity.service";


/**
 * Interfaz que describe la estructura de los datos de una entidad.
 */
export interface entityData {
  /** Título de la entidad. */
  title: string,
  /** Nombre de la entidad en plural. */
  entityPlural: string,
  /** Nombre de la entidad en singular. */
  entitySingular: string,
  /** Columnas que se mostrarán en la tabla. */
  columns: { header: string, field: string, }[],
  /** Configuración de la creación de elementos. */
  create: {
    /** Indica si se mostrará el botón de creación. */
    hasCreate: boolean,
    /** Texto del botón de creación. */
    createText?: string,
    /** URL de creación. */
    create?: string,
  }
  /** Configuración de las acciones de los elementos. */
  actions: {
    /** Indica si se mostrarán las acciones. */
    hasActions: boolean,
    /** URLs de las acciones. */
    actions?: {
      /** URL de mostrar. */
      show?: string,
      /** URL de editar. */
      edit?: string,
    }
  }
  /** Servicio de la entidad. */
  service: EntityService<any> | null,
  /** Elementos de la entidad. */
  items: any[] | null,
  /** Página actual. */
  page: number,
  /** Número de páginas totales. */
  totalPages: number,
  /** Número de elementos totales. */
  numItems: number,
  /** Número de resultados por página. */
  numResults: number,
  /** Configuración de búsqueda. */
  search: {
    /** Indica si se mostrará la barra de búsqueda. */
    hasSearch: boolean,
    /** Texto de búsqueda. */
    search?: string,
  }
}