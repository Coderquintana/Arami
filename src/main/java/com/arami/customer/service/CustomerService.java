package com.arami.customer.service;
import com.arami.customer.dto.CreateCustomerDTO;
import com.arami.customer.dto.CustomerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface CustomerService {
  CustomerDTO create(CreateCustomerDTO dto);
  Page<CustomerDTO> list(Pageable pageable);
}
