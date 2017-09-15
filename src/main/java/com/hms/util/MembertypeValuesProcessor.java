package com.hms.util;

import com.hms.pojo.Membertype;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class MembertypeValuesProcessor implements JsonValueProcessor {

    public MembertypeValuesProcessor() {
    }

    private Object process(Object value) {
        if (value instanceof Membertype) {
            return ((Membertype) value).getMembertypeName();
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
