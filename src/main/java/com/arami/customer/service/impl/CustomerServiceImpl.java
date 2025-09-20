package com.arami.customer.service.impl;
import com.arami.customer.dto.CreateCustomerDTO;
import com.arami.customer.dto.CustomerDTO;
import com.arami.customer.model.Customer;
import com.arami.customer.repo.CustomerRepository;
import com.arami.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
@Service @RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
  private final CustomerRepository repo;
  @Override public CustomerDTO create(CreateCustomerDTO dto){
    var entity = Customer.builder()
      .firstName(dto.firstName()).lastName(dto.lastName())
      .email(dto.email()).phone(dto.phone()).build();
    var saved = repo.save(entity);
    return toDTO(saved);
  }
  @Override public Page<CustomerDTO> list(Pageable pageable){
    return repo.findAll(pageable).map(this::toDTO);
  }
  private CustomerDTO toDTO(Customer c){
    return new CustomerDTO(
      c.getId(), c.getFirstName(), c.getLastName(), c.getEmail(), c.getPhone(),
      c.getCreatedAt().toString(), c.getUpdatedAt().toString()
    );
  }
}
