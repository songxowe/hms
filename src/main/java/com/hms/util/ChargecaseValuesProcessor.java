package com.hms.util;


import com.hms.pojo.Chargecase;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class ChargecaseValuesProcessor implements JsonValueProcessor {
    public ChargecaseValuesProcessor() {
    }

    private Object process(Object value) {
        if (value instanceof Chargecase) {
            return ((Chargecase) value).getChargecaseName();
        }
        return value == null ? "" : value.toString();
    }

    @Override
    public Object processArrayValue(Object value, JsonConfig config) {
        return process(value);
    }

    @Override
    public Object processObjectValue(String key, Object value, JsonConfig config) {
        return process(value);
    }


}
