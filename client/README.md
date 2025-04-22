# React Frontend - JWT Role-Based Authentication System

Bu proje, React kullanarak oluşturulmuş bir frontend uygulamasıdır. Uygulama, **JWT tabanlı kullanıcı kimlik doğrulaması** ve **rol bazlı yetkilendirme** sağlar.

## Başlangıç

### Gerekli Araçlar
- Node.js (14 ve üzeri)
- npm (Node Package Manager)

### Frontend Kurulumu ve Çalıştırılması

1. **Proje dizinine gidin**:
   cd client
Gerekli bağımlılıkları yükleyin:

2.
npm install
Uygulamayı başlatın:
3.
npm start
Bu komut, React uygulamanızı başlatacak ve http://localhost:3000 adresinde çalışacaktır.

Frontend ile Backend İletişimi:

Uygulama, backend API'leri ile iletişim kurar ve kullanıcı kimlik doğrulaması, profil yönetimi, yetkilendirme gibi işlemleri sağlar.

JWT token'ı, kullanıcının giriş yaptıktan sonra alınır ve tüm API isteklerinde Authorization header içinde gönderilir.

Proje Yapısı
src/ - Uygulamanın tüm React bileşenlerini ve sayfalarını içerir.

src/components/ - Tekrar kullanılabilir bileşenler.

src/pages/ - Sayfalar ve yönlendirme (Routing).

src/services/ - Backend ile iletişim kuran servisler (örneğin, API çağrıları).

Kullanıcı Kimlik Doğrulaması ve Yetkilendirme
Giriş Yapma: Kullanıcı adı ve şifre ile giriş yaptıktan sonra JWT token alınır.

JWT: JWT token, backend API'lerine yapılacak her istekte Authorization başlığı altında gönderilir.

Rol Bazlı Yetkilendirme: Kullanıcı rolüne göre erişim izni verilir.

Teknolojiler
Frontend: React, Axios

State Management: React Context API veya Redux (Projenin ihtiyaçlarına göre)

Sorunlar ve Katkılar
Eğer bir sorun ile karşılaşırsanız ya da katkıda bulunmak isterseniz, lütfen önce bir issue açın veya pull request gönderin.
