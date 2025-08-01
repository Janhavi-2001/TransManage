# 📑 TransManage - Translation Management Made Easy!
A simple translation management system made using React and Spring Boot

## ✅ Salient Features
### 1. A Simple Yet Effective Database Structure 
- Follows a 4-tier hierarchy aimed toward seamless content management: 
\
    ```Project → Page → TranslationKey → Translation``` 
- Proper relationships: All foreign keys and JPA mappings implemented
- Data integrity: Use of constraints and validation

### 2. Professional Entity Design
- Follows the translation lifecycle:
\
    ```PENDING → IN_REVIEW → REJECTED/APPROVED```
- Audit trails: Created/updated timestamps on all entities
- Metadata support: Notes field for translator feedback
- Flexible content types: KeyType enum (TITLE, TEXT, BUTTON, etc.)

### 3. Real-World Applicability
- Multi-project management
- Content organization (pages)
- Translation workflows
- Quality control (review process)
- Translator collaboration (notes/feedback)


## ⚙️ Tech Stack
- React.js
- Spring Boot
- REST APIs
- JSON
- H2 database




