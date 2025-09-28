-- Script pour vérifier l'état de la base de données
-- Vérifier si les types et tables existent

-- 1. Vérifier l'enum OtpPurpose
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OtpPurpose') 
        THEN '✅ Enum OtpPurpose existe' 
        ELSE '❌ Enum OtpPurpose manquant' 
    END as otp_purpose_status;

-- 2. Vérifier la table OtpChallenge
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'OtpChallenge') 
        THEN '✅ Table OtpChallenge existe' 
        ELSE '❌ Table OtpChallenge manquante' 
    END as otp_challenge_status;

-- 3. Vérifier la table CreditLedger
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'CreditLedger') 
        THEN '✅ Table CreditLedger existe' 
        ELSE '❌ Table CreditLedger manquante' 
    END as credit_ledger_status;

-- 4. Vérifier les colonnes WhatsApp dans User
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'waPhoneE164') 
        THEN '✅ Colonne waPhoneE164 existe' 
        ELSE '❌ Colonne waPhoneE164 manquante' 
    END as wa_phone_status;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'waUserId') 
        THEN '✅ Colonne waUserId existe' 
        ELSE '❌ Colonne waUserId manquante' 
    END as wa_user_id_status;

-- 5. Lister tous les types personnalisés
SELECT typname as custom_types FROM pg_type WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

-- 6. Lister toutes les tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
