function make_bi_maskip(mask) {
		if (i <= mask) {
			maskstring += '1';
		} else {
			maskstring += '0';
		}
		if (i % 8 == 0 && i != 32) {
			maskstring += '.';
		}
	}
	
	return maskstring;
}

function bi_to_deci(string) {
	var maskstring_li = string.split('.');
	for (var i = 0; i < maskstring_li.length; i++) {
		maskstring_li[i] = parseInt(maskstring_li[i], 2);
	}

	return maskstring_li.join('.');
}

function find_network_ip(ip, mask) {
	var ip_li = ip.split('.');
	var mask_li = bi_to_deci(make_bi_maskip(mask)).split('.');
	for (var i = 0; i < ip_li.length; i++) {
		ip_li[i] = parseInt(ip_li[i]) & parseInt(mask_li[i]);
	}
	return ip_li.join('.');
}

for (var i = 1; i <= 32; i++) {
 	$('select#subnet').append("<option value="+i+">"+ bi_to_deci(make_bi_maskip(i)) +'/'+i+"</option>");
}
 
$('form').submit(function(e){
 	e.preventDefault();
 	var ip = $('input#Inputip').val();
 	var subnet = $('select#subnet').val();
 	var network_addr = find_network_ip(ip, subnet);
 	console.log(ip);
 	console.log(subnet);
 	console.log(network_addr);
});