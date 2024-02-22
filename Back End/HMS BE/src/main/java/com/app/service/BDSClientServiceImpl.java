package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class BDSClientServiceImpl implements IBDSClientService {

	
	private RestTemplate restTemp;
	
	@Autowired
	public BDSClientServiceImpl (RestTemplateBuilder builder) {
		restTemp=builder.build();
	}
	
	
	@Override
	public List<?> getDonorList(String bloodGroup, int pinCode, int pageSize, int pageNo) {
		log.info("in BDSClientServiceImpl -->  bGroup="+bloodGroup+"pinCode="+pinCode+"pageSize="+pageSize+"pageNo="+pageNo);
		
		String url ="http://localhost:7171/staff/donorList?bGroup={bloodGroup}&pinCode={pinCode}&pageSize={pageSize}&pageNo={pageNo}";
		List<?> list = restTemp.getForEntity(url,List.class, bloodGroup,pinCode,pageSize,pageNo).getBody();
		
		return list;
	}

}
