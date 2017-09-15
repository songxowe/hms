package com.hms.util;

import com.hms.pojo.Bookroom;
import com.hms.pojo.Checkinfo;
import com.hms.pojo.Guest;
import com.hms.pojo.Pay;

import java.io.Serializable;
import java.util.List;

public class ReceivePojo implements Serializable {
    private static final long serialVersionUID = 8555717029327353335L;
    private List<Guest> guests;
    private List<Pay> pays;
    private List<Checkinfo> checkinfos;
    private List<String> strings;
    private List<Bookroom> bookrooms;

    public ReceivePojo() {

    }

    public List<Bookroom> getBookrooms() {
        return bookrooms;
    }

    public void setBookrooms(List<Bookroom> bookrooms) {
        this.bookrooms = bookrooms;
    }

    public List<Checkinfo> getCheckinfos() {
        return checkinfos;
    }

    public void setCheckinfos(List<Checkinfo> checkinfos) {
        this.checkinfos = checkinfos;
    }

    public List<String> getStrings() {
        return strings;
    }

    public void setStrings(List<String> strings) {
        this.strings = strings;
    }

    public List<Guest> getGuests() {
        return guests;
    }

    public void setGuests(List<Guest> guests) {
        this.guests = guests;
    }

    public List<Pay> getPays() {
        return pays;
    }

    public void setPays(List<Pay> pays) {
        this.pays = pays;
    }
}
