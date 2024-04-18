import {
  IsString,
  IsNotEmpty,
  IsOptional,
  validateSync,
} from 'class-validator';

export interface CreateCategoryInputConstructorProps {
  name: string;
  image_link?: string | null;
}

export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image_link?: string | null;

  constructor(props: CreateCategoryInputConstructorProps) {
    if (!props) return;
    this.name = props.name;
    this.image_link = props.image_link;
  }
}

export class ValidateCreateCategoryInput {
  static validate(input: CreateCategoryInput) {
    return validateSync(input);
  }
}
