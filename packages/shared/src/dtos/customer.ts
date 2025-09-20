export type CreateCustomer = {
  firstName: string
  lastName: string
  email: string
  phone?: string
}

export type Customer = CreateCustomer & {
  id: string
  createdAt: string
  updatedAt: string
}
