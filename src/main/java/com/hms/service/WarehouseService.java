package com.hms.service;

import com.hms.pojo.Warehouse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.hms.dao.WarehouseMapper;
import javax.annotation.Resource;
import java.util.List;

@Service("warehouseService")
@Transactional(readOnly = true,propagation = Propagation.NOT_SUPPORTED)
public class WarehouseService {

@Resource(name = "warehouseMapper")
private WarehouseMapper warehousemapper;
 @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)

public int add(Warehouse warehouse){
       return warehousemapper.add(warehouse);
}

public List<Warehouse> find(){
       return warehousemapper.find();
    }
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int modfiy(Warehouse warehouse){
    return warehousemapper.modify(warehouse);
    }
    public int remove(Integer warehouseId){
       return  warehousemapper.remove(warehouseId) ;
    }
    public Warehouse findById(Integer warehouseId){
      return  warehousemapper.findById(warehouseId);
    }
}
