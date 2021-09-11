package com.rmit.sept.ordermicroservices.model;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;


//@FilterDef(
//        name = "deletedFilter",
//        parameters = @ParamDef(name = "isDeleted", type = "boolean")
//)
//@Filter(
//        name = "deletedFilter",
//        condition = "deleted = :isDeleted"
//)
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
    protected void onCreate(){
        this.createAt = new Date();
        this.updateAt = this.createAt;
    }

    @PreUpdate
    protected void onUpdate(){
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
