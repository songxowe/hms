package com.hms.util;

import com.hms.pojo.Member;
import net.sf.json.JsonConfig;

public class MemberValueProcessor {
    public MemberValueProcessor() {
    }

    private Object process(Object value) {
        if (value instanceof Member) {
            return ((Member) value).getMemberName();
        }
        return value == null ? "" : value.toString();
    }

    public Object processArrayValue(Object value, JsonConfig config) {
        return process(value);
    }

    public Object processObjectValue(String key, Object value, JsonConfig config) {
        return process(value);
    }


}
