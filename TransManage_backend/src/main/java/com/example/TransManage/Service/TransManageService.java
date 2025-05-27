package com.example.TransManage.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TransManage.Repository.TransManageRepository;
import com.example.TransManage.Model.TransManageModel;
import java.util.List;

@Service
public class TransManageService {

    @Autowired
    private TransManageRepository repository;

    public List<TransManageModel> getTranslationsByLanguage(String lang) {
        return repository.findByLanguage(lang);
    }

    public TransManageModel addTranslation(TransManageModel t) {
        // Assuming the repository's save method can handle both insert and update
        return repository.save(t);
    }

    public TransManageModel updateTranslation(TransManageModel t) {
        // Assuming the repository's save method can handle both insert and update
        return repository.save(t);
    }

    public void deleteTranslation(Long id) {
        repository.deleteById(id);
    }
}

