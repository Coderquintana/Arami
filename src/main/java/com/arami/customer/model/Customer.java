package com.arami.customer.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
@Entity @Table(name="customer")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Customer {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  @Column(nullable=false) private String firstName;
  @Column(nullable=false) private String lastName;
  @Column(nullable=false, unique=true) private String email;
  private String phone;
  @Column(nullable=false) private Instant createdAt;
  @Column(nullable=false) private Instant updatedAt;
  @PrePersist void onCreate(){ createdAt = updatedAt = Instant.now(); }
  @PreUpdate void onUpdate(){ updatedAt = Instant.now(); }
}
