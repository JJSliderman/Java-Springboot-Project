package com.example.auth.config;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import com.example.auth.provider.CustomAuthProvider;
import java.util.Collections;
 
// Credit: https://www.javaspring.net/blog/custom-authentication-manager-with-spring-security-and-java-configuration/
@Configuration
@EnableWebSecurity
public class SecurityConfig {
 
    private final CustomAuthProvider customAuthProvider;
 
    public SecurityConfig(CustomAuthProvider customAuthProvider) {
        this.customAuthProvider = customAuthProvider;
    }
 
    // Define security rules (which endpoints are public, authenticated, etc.)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll() // Allow public endpoints
                .anyRequest().authenticated() // Secure all other endpoints
            )
            .httpBasic(withDefaults()) // Use basic auth for simplicity (replace with form login if needed)
            .csrf(csrf -> csrf.disable()); // Disable CSRF for testing (enable in production!)
 
        return http.build();
    }
 
    // Configure AuthenticationManager to use our custom provider
    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(Collections.singletonList(customAuthProvider));
    }
}