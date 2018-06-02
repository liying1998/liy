<template>
  <div class="pos">
     <el-row>
     	<el-col :span='7'   class="pos-order" id="order-list">
     		<el-tabs>
                <el-tab-pane label="点餐">
                	<el-table :data="tabledate" border style="width:100%;">
                       <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                       <el-table-column prop="count" label="数量" width="50"></el-table-column>
                       <el-table-column prop="price" label="价格" width="70"></el-table-column>
                       <el-table-column  label="操作" width="100" fixed="right">
                       <template scope="scope">
                          <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                          <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                       </template>
                      </el-table-column>
                	</el-table>
                	<div class="total">
                	   <small>数量:</small>{{totalCount}}个
                	   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                	   <small>金额:</small>{{totalMoney}}元
     			    </div>
                	<div class="btn">
                		<el-button type="warning">挂单</el-button>
                		<el-button type="danger" @click="delAll()">删除</el-button>
                		<el-button type="success" @click="checkout()">结账</el-button>
                	</div>
                </el-tab-pane>
                <el-tab-pane label="挂单">

                </el-tab-pane>
                <el-tab-pane label="外卖">

                </el-tab-pane>
     		</el-tabs>
     	</el-col>
     	<el-col :span='17'>
     		<div class="ofen-goods">
     			<div class="title">
     				常用商品
     			</div>
     			<div class="often-goods-list">
                    <ul>
                    	<li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                    		<span>{{goods.goodsName}}</span>
                    		<span class="o-price">￥{{goods.price}}元</span>
                    	</li>
                    	
                    </ul>
     			</div>
     		</div>

     		<div class="goods-type">
	            <el-tabs>
	                 <el-tab-pane label="汉堡">
                        <ul class='cookList'>
						    <li v-for="goods in typeGoods1" @click="addOrderList(goods)"> 
						        <span class="foodImg"><img  v-bind:src="goods.goodsImg" width="100%"></span>
						        <span class="foodName">{{goods.goodsName}}</span>
						        <span class="foodPrice">￥{{goods.price}}元</span>
						    </li>
						</ul>
	                 </el-tab-pane>
	                 <el-tab-pane label="小食">
	                 	<ul class='cookList'>
						    <li v-for="goods in typeGoods2" @click="addOrderList(goods)">
						        <span class="foodImg"><img  v-bind:src="goods.goodsImg" width="100%"></span>
						        <span class="foodName">{{goods.goodsName}}</span>
						        <span class="foodPrice">￥{{goods.price}}元</span>
						    </li>
						</ul>
	                 </el-tab-pane>
	                 <el-tab-pane label="饮料">
	                 	<ul class='cookList'>
						    <li v-for="goods in typeGoods3" @click="addOrderList(goods)">
						        <span class="foodImg"><img  v-bind:src="goods.goodsImg" width="100%"></span>
						        <span class="foodName">{{goods.goodsName}}</span>
						        <span class="foodPrice">￥{{goods.price}}元</span>
						    </li>
						</ul>
	                 </el-tab-pane>
	                 <el-tab-pane label="套餐">
	                 	<ul class='cookList'>
						    <li v-for="goods in typeGoods4" @click="addOrderList(goods)">
						        <span class="foodImg"><img  v-bind:src="goods.goodsImg" width="100%"></span>
						        <span class="foodName">{{goods.goodsName}}</span>
						        <span class="foodPrice">￥{{goods.price}}元</span>
						    </li>
						</ul>
	                 </el-tab-pane>
	            </el-tabs>
     		</div>
     	</el-col>
     </el-row>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'pos',
  data(){
     return {
        tabledate:[],
        oftenGoods:[],
        typeGoods1:[],
        typeGoods2:[],
        typeGoods3:[],
        typeGoods4:[],
        totalCount:0,
        totalMoney:0
     }
  },
  created:function(){
  	axios.get('http://jspang.com/DemoApi/oftenGoods.php')
  	.then(response=>{
        
        this.oftenGoods=response.data;
  	})
  	.catch(error=>{
  	    
  	     alert("网络错误，不能访问");
  	}),
  	axios.get('http://jspang.com/DemoApi/typeGoods.php')
  	.then(response=>{
        
        this.typeGoods1=response.data[0];
        this.typeGoods2=response.data[1];
        this.typeGoods3=response.data[2];
        this.typeGoods4=response.data[3];
  	})
  	.catch(error=>{     
  	     alert("网络错误，不能访问");
  	})
  },
  mounted:function(){
    var orderHeight = document.body.clientHeight;
    var order = document.getElementById("order-list");
    order.style.height=orderHeight+"px";
  },
  methods:{
      //goods这里代表的是商品对象  
      addOrderList(goods){
        this.totalCount=0;
        this.totalMoney=0;
         let isHave = false;
         //有的话在进行添加产品
         for(let i=0;i<this.tabledate.length;i++)
         {
            if(this.tabledate[i].goodsId==goods.goodsId)
            {
                isHave=true;

            }
         }
         if(isHave)
         {
              let arr = this.tabledate.filter(o=>o.goodsId==goods.goodsId);
              arr[0].count++;
         }
         //没有的话在进行重新添加
         else
         {
              let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
              this.tabledate.push(newGoods);
         }

         this.getAllMoney();
      },
      //删除单个商品
       delSingleGoods(goods){
           this.tabledate=this.tabledate.filter(o=>o.goodsId!=goods.goodsId);
           this.getAllMoney();
       },
       //总金额和数量
       getAllMoney(){
         this.totalCount=0;
         this.totalMoney=0;
         if(this.tabledate)
         {
            this.tabledate.forEach((element)=>{
            this.totalCount+=element.count;
        	this.totalMoney=this.totalMoney+(element.count*element.price);
         });
         }
       },
       delAll(){
         this.tabledate=[];
         this.totalCount=0;
         this.totalMoney=0;
       },
       //全结账
       checkout(){
           if(this.totalCount!=0)
           {
           		this.tabledate=[];
                this.totalCount=0;
                this.totalMoney=0;
                this.$message({
                  message:'结账成功',
                  type:'success'
                });
           }
           else
           {
              this.$message({
                 message:'不能空结',
                 type:'error'
              })
           }
       }
  }
  
}
</script>

<style scoped>
.pos-order{
    height:100%;
	background-color:#F9FAFC;
	border-right:1px solid #C0CCDA;
}
.btn{
	margin-top:20px;
}
.title{
       height: 20px;
       border-bottom:1px solid #D3DCE6;
       background-color: #F9FAFC;
       padding:10px;
   }
   .often-goods-list ul li{
      list-style: none;
      float:left;
      border:1px solid #E5E9F2;
      padding:10px;
      margin:5px;
      background-color:#fff;
      cursor:pointer;
   }
  .o-price{
      color:#58B7FF; 
   }
   .goods-type{
     margin-top:60px;
     clear:both;
   }
   .cookList li{
       list-style: none;
       width:23%;
       border:1px solid #E5E9F2;
       height: auot;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       float:left;
       margin: 2px;
       cursor:pointer;
 
   }
   .cookList li span{
       
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 18px;
       padding-left: 10px;
       color:brown;
 
   }
   .foodPrice{
       font-size: 16px;
       padding-left: 10px;
       padding-top:10px;
   }
   .total{
      padding:10px;
      background-color:#FFF;
      border-bottom:1px solid #E5E9F2;
   }
</style>
