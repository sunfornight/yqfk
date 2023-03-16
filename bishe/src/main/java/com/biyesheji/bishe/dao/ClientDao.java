package com.biyesheji.bishe.dao;

import com.biyesheji.bishe.bean.Client;
import com.biyesheji.bishe.bean.Corporation;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClientDao {
    public int getClientCounts(@Param("clientname") String clientname);
    public List<Client> getAllClient(@Param("clientname") String clientname, @Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int addClient( Client client);
    public Client getUpdateClient(int id);
    public int editClient(Client client);
    public int deleteClient(int id);
    public List<Corporation>clientGetAllCorporationName();
    public int updateClientLevel(@Param("clientid") Integer clientid,@Param("clientlevel") Integer clientlevel);
    public int getClientLevelCounts(int clientlevelInfo);
    public List<Client> getClientLevel(@Param("clientlevelInfo") int clientlevelInfo, @Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int updateDealState(@Param("id") Integer id,@Param("state") Integer state);
}
