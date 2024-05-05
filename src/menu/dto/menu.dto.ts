export class CreateMenuDto {
  readonly name: string
  readonly description?: string
}

export class UpdateMenuDto {
  readonly name?: string
  readonly description?: string
}

export class DeleteMenuDto {
  readonly id: string
}