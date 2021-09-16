package com.rmit.sept.bk_bookmicroservices.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@MappedSuperclass
public abstract class ServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private Date createAt;
    private Date updateAt;

    private boolean deleted;

    @PrePersist
    protected void onCreate() {
        this.createAt = new Date();
        this.updateAt = this.createAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateAt = new Date();
    }

    public void restore() {
        this.deleted = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public boolean isDeleted() {
        return deleted;
    }
}
