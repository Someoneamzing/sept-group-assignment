package com.rmit.sept.bk_bookmicroservices.model;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@MappedSuperclass
/**
 * Base abstract class for all database entities. Ensures consistent structure
 * for IDs, timestamps and deletion behaviour.
 */
public abstract class ServiceEntity {
    private static final Logger log = LoggerFactory.getLogger(ServiceEntity.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
     * Primary Key of the entity
     */
    private Long id;
    @NotNull
    /**
     * Modification / Creation timestamps.
     */
    private Date createAt;
    private Date updateAt;

    /**
     * Soft Deletion flag. True if this record has been "deleted". Allows for
     * restoring data in the event of accidental deletion.
     */
    private boolean deleted;

    @PrePersist
    /**
     * Updates the createAt timestamp on creation
     */
    protected void onCreate() {
        log.info(String.format("OnCreate called for id: %s", this));
        this.createAt = new Date();
        this.updateAt = this.createAt;
    }

    @PreUpdate
    /**
     * Updates the updateAt timestamp on updates.
     */
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
