import { Entity } from 'src/core/shared/domain/entity';
import { ValueObject } from 'src/core/shared/domain/value-object';
import { Uuid } from 'src/core/shared/domain/value-objects/uuid.vo';

export interface CategoryConstructorProps {
  category_id: CategoryId;
  name: string;
  image_link?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryCreateCommand {
  name: string;
  image_link?: string | null;
}

export class CategoryId extends Uuid {}

export class Category extends Entity {
  category_id: CategoryId;
  name: string;
  image_link: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id;
    this.name = props.name;
    this.image_link = props.image_link;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  get entity_id(): ValueObject {
    return this.category_id;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category({
      ...props,
      category_id: new CategoryId(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return category;
  }

  changeName(name: string): void {
    this.name = name;
    this.updated_at = new Date();
  }

  changeImageLink(image_link: string | null): void {
    this.image_link = image_link;
    this.updated_at = new Date();
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      image_link: this.image_link,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
