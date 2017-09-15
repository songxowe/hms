package com.hms.service;

import com.hms.dao.*;
import com.hms.pojo.Repertory;
import com.hms.pojo.Stock;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("stockService")
public class StockService {
    @Resource(name = "stockMapper")
    private StockMapper stockMapper;
    @Resource(name = "productMapper")
    private ProductMapper productMapper;
    @Resource(name = "warehouseMapper")
    private WarehouseMapper warehouseMapper;
    @Resource(name = "supplierMapper")
    private SupplierMapper supplierMapper;
    @Resource(name = "repertoryMapper")
    private RepertoryMapper repertoryMapper;
    private Repertory repertory;

    public List<Stock> find() {
        return stockMapper.find();
    }

    public int add(Stock stock) {
        return stockMapper.add(stock);
    }

    public int remove(Integer stockId) {
        return stockMapper.remove(stockId);
    }

    public int modfiy(Stock stock) {
        return stockMapper.modfiy(stock);
    }
}