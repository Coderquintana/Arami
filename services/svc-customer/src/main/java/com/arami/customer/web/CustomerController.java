package com.arami.customer.web;
import com.arami.customer.dto.CreateCustomerDTO;
import com.arami.customer.dto.CustomerDTO;
import com.arami.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
@RestController @RequestMapping("/api/customers") @RequiredArgsConstructor
public class CustomerController {
  private final CustomerService service;
  @PostMapping public ResponseEntity<CustomerDTO> create(@Valid @RequestBody CreateCustomerDTO dto){
    return ResponseEntity.ok(service.create(dto));
  }
  @GetMapping public Page<CustomerDTO> list(Pageable pageable){
    return service.list(pageable);
  }
}
