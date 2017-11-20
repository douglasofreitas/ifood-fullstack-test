package com.ifood.demo.client;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Client {

	private @Id @GeneratedValue UUID id;
	private final String name;
	private final String email;
	private final String phone;

	protected Client() {
		this.name = null;
		this.email = null;
		this.phone = null;
	}
	
	public Client(String name, String email, String phone) {
		this.name = name;
		this.email = email;
		this.phone = phone;
	}
	
	public String toString() {
		return this.name+"-"+this.email+"-"+this.phone;
		
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPhone() {
		return phone;
	}
	
}
