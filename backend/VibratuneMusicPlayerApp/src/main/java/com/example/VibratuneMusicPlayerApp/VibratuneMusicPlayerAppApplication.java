package com.example.VibratuneMusicPlayerApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class VibratuneMusicPlayerAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(VibratuneMusicPlayerAppApplication.class, args);
	}
}
	