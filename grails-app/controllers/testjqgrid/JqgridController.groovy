package testjqgrid

import grails.converters.JSON


class JqgridController {

    def index() { 
		println("###################entering to controller####################")
		def gridList=[]
		def gridListMap=[:]
		def responseMap=[:]
		gridListMap= ["fname":"Ipsita","lname":"Mahapatra","placefrom":"Orissa",  "enumber":"104835"];
		
		gridList.add(gridListMap);
		gridListMap= ["fname":"Abc", "lname":"def","placefrom":"MP", "enumber":"4395"];
		gridList.add(gridListMap);
		gridListMap= ["fname":"def", "lname":"def","placefrom":"UP","enumber":"204836"];
		gridList.add(gridListMap);
		responseMap.put("gridList", gridList);
		println("######################responseMap#########################"+toJSON(responseMap))
		render toJSON(responseMap)
		  
	}
	private def toJSON(elements, depth = 0) {
		def json = ""
		depth.times { json += "\t" }
		json += "{"
		elements.each { key, value ->
			json += "\"$key\":"
			json += jsonValue(value, depth)
			json += ", "
		}
 
		json = (elements.size() > 0) ? json.substring(0, json.length() - 2) : json
		json += "}"
		json
	}
 
	private def jsonValue(element, depth) {
		if (element instanceof Map) {
			return "\n" + toJSON(element, depth + 1)
		}
		if (element instanceof List) {
			def list = "["
			element.each { elementFromList ->
				list += jsonValue(elementFromList, depth)
				list += ", "
			}
			list = (element.size() > 0) ? list.substring(0, list.length() - 2) : list
			list += "]"
			return list
		}
		"\"$element\""
	}
}
