-- Dummy data for the 'projects' table

-- 'website revamp' project
INSERT INTO projects (name, description, base_language, target_languages, status, created_at, updated_at)
VALUES
('Website Revamp', 
 'A complete redesign and translation of the main website.',
 'English', 
 'Spanish, French, German',
 'ACTIVE',
 NOW(), NOW()),

-- 'Mobile App Localization',
('Mobile App Localization', 
 'Translating the mobile application for global release.',
 'English', 
 'Japanese, Korean, Chinese',
 'PENDING',
 NOW(), NOW());


-- Dummy data for the 'pages' table

-- 'website revamp' project
INSERT INTO pages (name, description, project_id, content, status, created_at, updated_at)
VALUES 
('Landing Page', 'The main landing page of the project.', 1, '<h1>Welcome to Our App</h1>', 'ACTIVE', NOW(), NOW()),
('About Us', 'Information about the company and mission.', 1, '<p>We build translation management tools.</p>', 'COMPLETED', NOW(), NOW()),
('Contact Page', 'User contact and support information.', 1, '<p>Email us at support@example.com</p>', 'PENDING', NOW(), NOW()),

-- 'mobile app localization' project
('Welcome Screen', 'The initial welcome screen of the mobile app.', 2, '<div>Welcome to the App!</div>', 'ACTIVE', NOW(), NOW()),
('Settings Page', 'User settings and preferences.', 2, '<div>Change your settings here.</div>', 'IN_REVIEW', NOW(), NOW()),
('Terms of Service', 'Legal information and usage terms.', 2, '<p>These are the terms and conditions...</p>', 'ON_HOLD', NOW(), NOW()),
('Privacy Policy', 'User data and privacy statement.', 2, '<p>We respect your privacy.</p>', 'CANCELLED', NOW(), NOW());


INSERT INTO translation_keys (page_id, project_id, trans_key, trans_key_name, source_text, description, key_type, is_required, character_limit, created_at, updated_at)
VALUES
-- Website Revamp - Landing Page
(1, 1, 'landing_title', 'Landing Page Title', 'Welcome to Our Revamped Website', 'Title text for main landing page.', 'TITLE', TRUE, 100, NOW(), NOW()),
(1, 1, 'landing_cta', 'Landing Page CTA', 'Get Started', 'Button to lead users to sign up.', 'BUTTON', TRUE, 50, NOW(), NOW()),

-- Website Revamp - About Us
(2, 1, 'about_intro', 'About Us Intro', 'We create multilingual digital experiences.', 'Main intro section of About Us.', 'TEXT', TRUE, 255, NOW(), NOW()),

-- Mobile App Localization - Home Screen
(4, 2, 'home_welcome', 'Home Welcome Text', 'Welcome to our app!', 'Greeting text on home screen.', 'TEXT', TRUE, 120, NOW(), NOW()),
(4, 2, 'home_button', 'Home Button Text', 'Start', 'Main button on home screen.', 'BUTTON', TRUE, 20, NOW(), NOW()),

-- Mobile App Localization - Settings Page
(5, 2, 'settings_title', 'Settings Page Title', 'Settings', 'Title displayed at the top of the settings screen.', 'TITLE', TRUE, 80, NOW(), NOW())
ON CONFLICT (trans_key) DO NOTHING;


-- Dummy data for the 'translation' table

INSERT INTO translations (project_id, page_id, translation_key_id, target_language, translated_text, status, notes, created_at, updated_at)
VALUES
-- Website Revamp project
(1, 1, 1, 'Spanish', '<h1>Bienvenido a Nuestro Sitio Renovado</h1>', 'APPROVED', 'Reviewed and approved by native speaker.', NOW(), NOW()),
(1, 2, 2, 'French', '<p>Nous créons des expériences numériques multilingues.</p>', 'IN_REVIEW', 'Pending review by QA team.', NOW(), NOW()),
(1, 3, 3, 'German', '<p>Ihre Privatsphäre ist uns wichtig.</p>', 'PENDING', 'Initial draft ready.', NOW(), NOW()),

-- Mobile App Localization project
(2, 4, 4, 'Japanese', '<div>アプリへようこそ！</div>', 'APPROVED', 'Checked and verified.', NOW(), NOW()),
(2, 5, 5, 'Korean', '<div>여기에서 설정을 변경할 수 있습니다.</div>', 'REJECTED', 'Translation tone does not match UI style.', NOW(), NOW());





