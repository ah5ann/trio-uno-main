<?php  ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$date=date('w');    
$alfa=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 

if($date==1){

  $updated=file_get_contents('last_update.txt');
  if($updated!=date('mw')){
$words=json_decode(file_get_contents('word.json'),true);
$rand_keys = array_rand($alfa, 7);

$newdata='const words = ['.PHP_EOL;
for($i=0;$i<7;$i++){
  $newdata.='"'.$words[$alfa[$rand_keys[$i]]][rand(0,count($words[$alfa[$rand_keys[$i]]])-1)].' '.$words[$alfa[$rand_keys[$i]]][rand(0,count($words[$alfa[$rand_keys[$i]]])-1)].' '.$words[$alfa[$rand_keys[$i]]][rand(0,count($words[$alfa[$rand_keys[$i]]])-1)].' '.$words[$alfa[$rand_keys[$i]]][rand(0,count($words[$alfa[$rand_keys[$i]]])-1)].' '.$words[$alfa[$rand_keys[$i]]][rand(0,count($words[$alfa[$rand_keys[$i]]])-1)].'",'.PHP_EOL;
 
}
echo 'y';
$newdata.='];'.PHP_EOL;
$js=explode('//ar',file_get_contents('scripts/requestt.js'));
$newjs=$js[0].PHP_EOL.'//ar'.PHP_EOL.$newdata.PHP_EOL.'//ar'.PHP_EOL.$js[2];
if(file_put_contents('scripts/requestt.js',$newjs)){
  echo 'updated';
}else{
  echo 5;
}  
file_put_contents('last_update.txt',$updated);  
  }
  echo $updated;
}
