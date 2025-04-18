# 🛡️ Secure Customer Product API

Bu proje, Spring Boot kullanılarak geliştirilmiş güvenli bir CRUD API uygulamasıdır. Kullanıcılar JWT ile kimlik doğrulaması yaparak **Customer** ve ona bağlı **Product** verilerini yönetebilir. Projede **DTO**, **Spring Security**, **JWT**, **OneToMany ilişkisi** ve **role-based authorization** gibi ileri düzey yapılar bulunmaktadır.

## 🚀 Özellikler

- Kullanıcı Kayıt & Giriş (JWT Token ile)
- Customer - Product ilişkisi (OneToMany)
- CRUD işlemleri (DTO kullanılarak)
- Endpoint'lere erişimde güvenlik kontrolü (JWT + Role kontrolü)
- Temiz, modüler ve okunabilir kod yapısı

## 🔐 Authentication Endpoints

| Endpoint        | Açıklama                    |
|----------------|-----------------------------|
| `/register`     | Yeni kullanıcı kaydı        |
| `/authenticate` | Giriş yapar ve JWT döner     |

## 📦 Customer Endpoints

| Endpoint                         | Açıklama                                              |
|----------------------------------|--------------------------------------------------------|
| `POST /customer/save`           | Yeni müşteri ve ilişkili ürün kaydı (JSON body ile)    |
| `GET  /customer/list`           | Tüm müşterileri ve ürünlerini listeler                 |
| `GET  /customer/id/{id}`        | Belirli bir ID'ye sahip müşteri ve ürünlerini getirir |
| `PUT  /customer/update/{id}`    | Müşteri ve ürün bilgisini günceller                   |
| `DELETE /customer/delete/{id}`  | Belirli bir müşteriyi siler                           |

## 🔐 Güvenlik

- Tüm `/customer/**` endpoint'lerine erişim için **JWT Token** gereklidir.
- Token olmadan ya da geçersiz token ile erişim denemeleri reddedilir.
- Kullanıcı rollerine göre yetkilendirme yapılabilir (geliştirmeye açık).

## 🛠️ Kullanılan Teknolojiler

- Java 17+
- Spring Boot
- Spring Validation
- Spring Security
- Spring Data JPA
- JWT (Json Web Token)
- Lombok
- PostgreSQL
- Maven

## 📁 Projeyi Çalıştırmak

```bash
git clone https://github.com/Batuhan-Yalcin/Secure-Customer-Product-API.git
cd Secure-Customer-Product-API
mvn clean install
