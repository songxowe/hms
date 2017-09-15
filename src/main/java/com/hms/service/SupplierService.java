package com.hms.service;

import com.hms.dao.SupplierMapper;
import com.hms.pojo.Supplier;
import com.hms.pojo.Warehouse;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import javax.annotation.Resource;

@Service("supplierService")
@Transactional(readOnly = true,propagation = Propagation.NOT_SUPPORTED)
public class SupplierService {
    @Resource(name = "supplierMapper")
    private SupplierMapper supplierMapper;

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int  add(Supplier supplier){
        return supplierMapper.add(supplier);
    }

    public  int remove(Integer supplierId){
        return  supplierMapper.remove(supplierId);
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public  int modfiy(Supplier supplier){
        return supplierMapper.modfiy(supplier);
    }

    public List<Supplier> find(String supplierName){
        return supplierMapper.find(supplierName);
    }
    public Supplier findById(Integer supplierId){
        return supplierMapper.findById(supplierId);
    }

}
