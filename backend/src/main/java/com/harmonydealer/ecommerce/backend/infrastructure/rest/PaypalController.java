package com.harmonydealer.ecommerce.backend.infrastructure.rest;

import com.harmonydealer.ecommerce.backend.domain.model.DataPayment;
import com.harmonydealer.ecommerce.backend.domain.model.URLPaypalResponse;
import com.harmonydealer.ecommerce.backend.infrastructure.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/payments")
@Slf4j
public class PaypalController {
    private final PaypalService paypalService;
    private final String SUCCESS_URL = "http://localhost:8085/api/v1/payments/success";
    private final String CANCEL_URL = "http://localhost:8085/api/v1/payments/cancel";

    @PostMapping
    public URLPaypalResponse createPayment(@RequestBody DataPayment dataPayment){
        try {
            Payment payment = paypalService.createPayment(
                    Double.valueOf(dataPayment.getAmount()),
                    dataPayment.getCurrency(),
                    dataPayment.getMethod(),
                    "sale",
                    dataPayment.getDescription(),
                    CANCEL_URL,
                    SUCCESS_URL
            );
            for (Links links : payment.getLinks()){
                if (links.getRel().equals("approval_url")){
                    return new URLPaypalResponse(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }

        return new URLPaypalResponse("http://localhost:4200");
    }

    @GetMapping("/success")
    public RedirectView paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId
    ){
        log.info("Entrando al método paymentsucces");
        log.info("paymentId: {}", paymentId);
        log.info("payerId: {}", payerId);
        try {
            Payment payment = paypalService.executePayment(paymentId,payerId);
            log.info("Estado del pago: {}",payment.getState());
            if (payment.getState().equals("approved")){
                log.info("Pago aprobado, redirigiendo al frontend");
                return new RedirectView("http://localhost:4200");
            }
        } catch (PayPalRESTException e) {
            log.error("Error al ejecutar el pago", e);
        }
        log.warn("Pago no aprobado, redirigiendo al frontend");
        return new RedirectView("http://localhost:4200");
    }

    @GetMapping("/cancel")
    public RedirectView paymentCancel(){
        return new RedirectView("http://localhost:4200");
    }
}
