package com.arami.customer.dto;
import jakarta.validation.constraints.*;
public record CreateCustomerDTO(
  @NotBlank String firstName,
  @NotBlank String lastName,
  @Email @NotBlank String email,
  String phone
) {}
