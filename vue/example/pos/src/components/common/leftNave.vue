<template>
  <div class="leftNave">
     <ul>
        <li>
         <i class="icon iconfont icon-shouyin"></i>
         <div>收银</div>
        </li>
        <li>
          <i class="icon iconfont icon-dianpu"></i>
         <div>店铺</div>
        </li>
        <li>
          <i class="icon iconfont icon-hanbao1"></i>
         <div>商品</div>
        </li>
        <li>
          <i class="icon iconfont icon-huiyuan"></i>
         <div>会员</div>
        </li>
     </ul>
  </div>
</template>

<script>
export default {
  name: 'leftNave'
  
}
</script>


<style>
   .leftNave{
      color:#fff;
      font-size:10px;
      height:100%;
      background-color:#1D8CE0;
      float:left;
      width:5%;
   }
   .iconfont{
      font-size:24px;
   }
   .leftNave ul{
       padding:0px;
       margin:0px;
   }
   .leftNave li{
      list-style:none;
      text-align:center;
      border-bottom:1px solid gray;
      padding:10px;
   }
</style>
