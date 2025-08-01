package com.example.TransManage.Repository;

import com.example.TransManage.Model.Translation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TranslationRepository extends JpaRepository<Translation, Long> {
    List<Translation> findByTranslationKeyId(Long translationKeyId);
}
