package com.biyesheji.bishe.dao;

import com.biyesheji.bishe.bean.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository//该注解用于CRUD类
public interface UserDao {
    public User getUserByMessage(@Param("username") String username, @Param("password") String password);
    public List<User> getAllUser(@Param("username") String username, @Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int getUserCounts(@Param("username") String username);
    public int updateState(@Param("id") Integer id,@Param("state") Integer state);
    public int addUser( User user);
    public int deleteUser(int id);
    public User getUpdateUser(int id);
    public int editUser(User user);
    public void addVisits(@Param("id") Integer id ,@Param("visits") Integer visits);
    public List<User> getAllUserList();
}
