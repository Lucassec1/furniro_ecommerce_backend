import {
  IsString,
  IsNotEmpty,
  IsOptional,
  validateSync,
} from 'class-validator';

export interface UpdateCategoryInputConstructorProps {
  id: string;
  name?: string;
  image_link?: string | null;
}

export class UpdateCategoryInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  image_link?: string | null;

  constructor(props: UpdateCategoryInputConstructorProps) {
    if (!props) return;
    this.id = props.id;
    props.name && (this.name = props.name);
    props.image_link && (this.image_link = props.image_link);
  }
}

export class ValidateUpdateCategoryInput {
  static validate(input: UpdateCategoryInput) {
    return validateSync(input);
  }
}
