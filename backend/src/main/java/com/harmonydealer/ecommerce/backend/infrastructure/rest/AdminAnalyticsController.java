package com.harmonydealer.ecommerce.backend.infrastructure.rest;


import com.harmonydealer.ecommerce.backend.application.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/analytics")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class AdminAnalyticsController {

    private final OrderService orderService;

    @GetMapping("/sales/day")
    public ResponseEntity<List<Object[]>> getSalesByDay() {
        return ResponseEntity.ok(orderService.getSalesByDay());
    }

    @GetMapping("/sales/month")
    public ResponseEntity<List<Object[]>> getSalesByMonth() {
        return ResponseEntity.ok(orderService.getSalesByMonth());
    }

    @GetMapping("/sales/year")
    public ResponseEntity<List<Object[]>> getSalesByYear() {
        return ResponseEntity.ok(orderService.getSalesByYear());
    }

    @GetMapping("/top-products")
    public ResponseEntity<List<Object[]>> getTopSellingProducts() {
        return ResponseEntity.ok(orderService.getTopSellingProducts());
    }
}
