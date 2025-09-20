package com.arami.customer.dto;
public record CustomerDTO(
  Long id, String firstName, String lastName, String email, String phone, String createdAt, String updatedAt
) {}
