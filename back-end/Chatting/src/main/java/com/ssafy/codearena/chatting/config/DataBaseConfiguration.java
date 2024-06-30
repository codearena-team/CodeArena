package com.ssafy.codearena.chatting.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;

@Configuration
@PropertySource("classpath:/application.properties")
@MapperScan(basePackages = {"com.ssafy.codearena.*.mapper"})
public class DataBaseConfiguration {

    final ApplicationContext applicationContext;
    // mapper.xml 위치를 Resource객체 로 들고오기 위해

    public DataBaseConfiguration(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Bean
    // ApplicationContext이 Bean을 관리하는 역할을 수행하고
    // SpringBootApplication이 실행될 때 @Configuration 어노테이션이 붙은 java파일을 설정정보로 등록한다.
    // 이 때 @Bean으로 등록된 메서드들을 기반으로 빈 목록을 생성한다.
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    public HikariConfig hikariConfig() {
        // application.properties 파일에서 spring.datasource.hikari로 시작하는 설정 값들을 가져와 Hikari 설정 객체를 반환한다.
        return new HikariConfig();
    }

    @Bean
    public DataSource dataSource() {
        // HikariDataSource를 사용하기 위해 Hikari 설정 객체를 생성자로 넣은 HikariDataSource 객체 반환
        return new HikariDataSource(hikariConfig());
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        // SqlSessionFactory는 Mybatis-spring 때 처럼 SqlSessionFactoryBean을 통해 생성되는데
        // 각종 typeAliase(DTO), mapperLocation(xml위치), DB접속정보(datasource)를 property를 통해 추가한다.
        // 즉 setter를 통해 추가된다.

        SqlSessionFactoryBean session = new SqlSessionFactoryBean();
        session.setDataSource(dataSource);
        session.setMapperLocations(applicationContext.getResources("classpath:mapper/**/*.xml"));
        session.setTypeAliasesPackage("com.ssafy.codearena.*.dto");
        return session.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        // SqlSessionTemplate은 SqlSession인터페이스 타입의 객체이며
        // 결국 SqlSessionFactory의 각종 설정 정보를 통해 만들어지므로 생성자로 넣게 된다.
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
