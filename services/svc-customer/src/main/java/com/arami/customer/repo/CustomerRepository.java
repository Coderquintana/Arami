package com.arami.customer.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.arami.customer.model.Customer;
import java.util.Optional;
public interface CustomerRepository extends JpaRepository<Customer, Long>{
  Optional<Customer> findByEmail(String email);
}
