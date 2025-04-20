## 🛡️ Secure Customer Product API
## Bu proje, Spring Boot kullanılarak geliştirilmiş güvenli ve profesyonel bir CRUD API uygulamasıdır. Kullanıcılar JWT ile kimlik doğrulaması yaparak Customer ve ona bağlı Product verilerini yönetebilir. Proje, modern yazılım geliştirme standartlarına uygun olarak geliştirilmiştir ve aşağıdaki ileri seviye özellikleri içermektedir:

🚀 Özellikler
✅ JWT ile kullanıcı kaydı ve giriş işlemleri

✅ Customer - Product arasında OneToMany ilişkisi

✅ Rol bazlı yetkilendirme (Admin / User)

✅ Stateless oturum yönetimi (Session tutulmaz)

✅ Profesyonel exception mimarisi

✅ H2 veritabanı yapılandırması

✅ DTO yapısı ile veri transferi

✅ Clean Code prensiplerine uygun yapı

## 🎯 Default Rol Ataması:
Yeni kayıt olan her kullanıcıya varsayılan olarak ROLE_USER atanır.

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

## 🛡️ Admin Endpoints (Yalnızca ROLE_ADMIN)

Endpoint	Açıklama
GET /admin/info	Admin paneline özel bilgi
GET /admin/users	Sistemdeki tüm kullanıcılar

## 🔐 Güvenlik

- Tüm `/customer/**` endpoint'lerine erişim için **JWT Token** gereklidir.
- Token olmadan ya da geçersiz token ile erişim denemeleri reddedilir.
- Kullanıcı rollerine göre yetkilendirme yapılabilir (geliştirmeye açık).
Role-Based Authorization kullanıldı.

SecurityConfig ile özel güvenlik ayarları yapıldı.

JWTAuthenticationFilter ile her istek JWT ile kontrol edilir.

@EnableMethodSecurity ile method seviyesinde güvenlik sağlandı.

Stateless session yönetimi ile scalable mimari desteklendi.

## 🛠️ Kullanılan Teknolojiler
- Java 17+
- Spring Boot
- Spring Validation
- Spring Security
- Spring Data JPA
- H2 Database
- JWT (Json Web Token)
- Lombok
- Global Exception Handler
- Maven

## 📁 Projeyi Çalıştırmak

```bash
git clone https://github.com/Batuhan-Yalcin/Secure-Customer-Product-API.git
cd Secure-Customer-Product-API
mvn clean install
