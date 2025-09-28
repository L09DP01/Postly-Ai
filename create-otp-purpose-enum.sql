-- Script pour créer l'enum OtpPurpose manquant
DO $$ BEGIN
    -- Créer l'enum OtpPurpose s'il n'existe pas
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OtpPurpose') THEN
        CREATE TYPE "OtpPurpose" AS ENUM ('LOGIN', 'LINK', 'SIGNUP');
        RAISE NOTICE 'Enum OtpPurpose créé avec succès';
    ELSE
        RAISE NOTICE 'Enum OtpPurpose existe déjà';
    END IF;
END $$;

-- Vérification
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OtpPurpose') 
        THEN '✅ Enum OtpPurpose créé avec succès !' 
        ELSE '❌ Échec de la création de l''enum OtpPurpose' 
    END as result;
