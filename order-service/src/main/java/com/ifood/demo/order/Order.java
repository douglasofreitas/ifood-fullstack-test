package com.ifood.demo.order;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Document
@RequiredArgsConstructor
public class Order {	
	
	private @Id UUID id = UUID.randomUUID();
	private final UUID clientId;
	private final UUID restaurantId;
	private final Date createdAt;
	private final Date confirmedAt;	
	private final List<Item> items;
	
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public UUID getClientId() {
		return clientId;
	}

	public UUID getRestaurantId() {
		return restaurantId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Date getConfirmedAt() {
		return confirmedAt;
	}

	public List<Item> getItems() {
		return items;
	}
	
	public Order() {
		this.clientId = null;
		this.restaurantId = null;
		this.createdAt = null;
		this.confirmedAt = null;
		this.items = null;
	}

	public Order(UUID clientId, UUID restaurantId, Date createdAt, Date confirmedAt, List<Item> items) {
		this.clientId = clientId;
		this.restaurantId = restaurantId;
		this.createdAt = createdAt;
		this.confirmedAt = confirmedAt;
		this.items = items;
	}
	
	@Data
	@RequiredArgsConstructor
	public static class Item {

		private final String description;
		private final Integer quantity;		
		private final Double price;
		
		public Item(String description, Integer quantity, Double price) {
			this.description = description;
			this.quantity = quantity;
			this.price = price;
		}
		public Item() {
			this.description = null;
			this.quantity = null;
			this.price = null;
		}
		public String getDescription() {
			return description;
		}
		public Integer getQuantity() {
			return quantity;
		}
		public Double getPrice() {
			return price;
		}
	}
}
