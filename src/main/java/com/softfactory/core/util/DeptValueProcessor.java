package com.softfactory.core.util;

import com.softfactory.pojo.Dept;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

/**
 * 输出 JSON 值时部门 格式化转换
 * 
 * @author SONG
 * 
 */
public class DeptValueProcessor implements JsonValueProcessor {
  public DeptValueProcessor() {

  }

  public Object processArrayValue(Object value, JsonConfig config) {
    return process(value);
  }

  public Object processObjectValue(String key, Object value, JsonConfig config) {
    return process(value);
  }

  private Object process(Object value) {
    if (value instanceof Dept) {
      return ((Dept) value).getDname();
    }
    return value == null ? "" : value.toString();
  }

}
