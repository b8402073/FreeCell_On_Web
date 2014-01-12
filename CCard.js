﻿//<script language="JavaScript">
String.prototype.trim = function(){return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))} 
String.prototype.startsWith = function(str)  {return (this.match("^"+str)==str)} 
String.prototype.startsWith = function(str)  {return (this.match("^"+str)==str)} 
function usefloor(min,max) { return Math.floor(Math.random()*(max-min+1)+min); } 


//上面是人家寫的
var CLUB=0;
var DIAMOND=1;
var HEART=2;
var SPADE=3;
var CardDeck= new Array(52);
var COL = 8;
var ROW = 23;
var thisWorld=null;
var hand= "EMPTY";

function Problem_rule(upper,lower)
{
    if (upper==null && lower==null)
        return true;
    if (upper.Number- lower.Number==1 && upper.isRed!= lower.isRed)
        return true;
    return false;
}
function SuitToStr(inn) {
  	switch(inn)
	{
	 case CLUB:  return "C";
	 case DIAMOND: return "D";
	 case HEART: return "H";
	 case SPADE: return "S";
	 default:    return "@";
	}
}
function SuitColor(inn) {
	switch(inn) 
	{
	  case DIAMOND:  case HEART:
		return true;
	  default:
		return false;
	}
} 
function Card_GetValueFromString(inn) {

    //var str= String.prototype.trim(inn);
    var str=inn;  //@@?
    if (str.length==2) {
        str= str.substr(0,1);                    
        return parseInt( str,10);
    }else if (str.length==3) {
        str= str.substr(0,2);
        return parseInt(str,10);
    }    
    //document.write("Not String");
    return 0;
}
function Card_GetSuitFromString(inn){
    //var str= String.prototype.trim(inn);
    var str=inn;
    if (str.length==2) {
        str=str.substr(1,1);
    }else if (str.length==3) {
        str=str.substr(2,1);
    }
    if ( str=="C" || str=="D" || str=="H" || str=="S")
        return str;
    else
        return "@";
}
function Card_Equal(thes,that) {
    if (thes.id==that.id)
        return true;
    return false;
}
function Card_isCard(inn) {
    //var str= inn.trim();
    var str=inn; //@@?
    var num= Card_GetValueFromString(str);
    if (num>=1 && num<=13) {
        var ch= Card_GetSuitFromString(str);
        if (ch!="@") {
            return true;
        }
    }
    return false;
}

function card(inn) {
    this.ID=     inn;
	this.Suit=   inn%4;
	this.Number= parseInt(inn/4,10)+1;
	this.String= " "+ this.Number + SuitToStr(this.Suit);
	this.isRed=  SuitColor(this.Suit);
}
function CardDeck_GetCard2(N,S) {
    return  CardDeck[ (N-1)*4+S ];
}

function CardDeck_GetCard1(str) {
    var N= Card_GetValueFromString(str);
    var S= Card_GetSuitFromString(str);
    return CardDeck_GetCard2(N,S);
}

function sm(a,b)
{
    if (a==null && b!=null)
        return 1;
    else if (a!=null && b==null)
        return -1;
    else if (a==null && b==null)
        return 0;
    if (a.Number < b.Number)
        return -1;
    else if (a.Number > b.Number)
        return 1;
    else {
        if (a.Suit < b.Suit)
            return -1;
        else if (a.Suit > b.Suit)
            return 1;                      
    }
    return 0;
}
function MyBuffer() {
    this.hand= Array(4);
    this.add = function(inn) { 
        for (var i=0; i<4; i++)
        {
            if (this.hand[i]==null)
                this.hand[i]=inn;
        }
        this.hand.sort(sm);
    }
    this.count= function(inn) {
        for (var i=0; i<4; i++)
        {
            if (this.hand[i]==null)
                return (i);
        }
        return 4;
    }
    this.search= function(inn) {
        for (var i=0; i< this.count(); i++)  
        {
           var that= this.hand[i];
           if (Card_Equals(that,inn))
            return true;
        }
        return false;
    }
    this.remove= function(inn) {
        for (var i=0; i< this.count(); i++)
        {
            var that= this.hand[i];
            if (Card_Equal(that,inn))
            {
                this.hand[i]=null;
                return true;
            }
        }
        return false;
    }
    this.Available= function() {
        return (4- this.count());
    }
    this.toString= function() {
        var ret="[";
        for(var i=0; i< this.count(); i++)
        {
            ret += this.hand[i].toString();
            ret += " ";
        }
        ret += "]";
        return ret;
    }
    this.setExample= function() {
        this.hand[0]= CardDeck_GetCard1("5C");
        this.hand[1]= CardDeck_GetCard1("12S");
        this.hand[2]=null;
        this.hand[3]=null;
    }
}
function CC(str) {
    return CardDeck_GetCard1(str);
}

function Problem() {
    this.NowMaxPos=Array(8);
    this.MB= new MyBuffer();
    this.arr=new Array(8);
    for (var v=0; v<8; v++)
    {
       this.arr[v]= new Array(25);
       for (var t=0; t<25; t++)
       {
            this.arr[v][t]=null;
       }
    }
    this.FirstBlankLine= function() {
        for (var i=0; i<8; i++)
        {
            if (this.NowMaxPos[i]==0)
                return (i+1);
        }
        return -1;        
    }
    this.HowManyBlankLines= function() {
        var ret=0;
        for (var i=0; i<8; i++)
        {
            if (this.NowMaxPos[i]==0)
                ++ret;
        }
        return ret;
    }
    this.MaxOf_NowMaxPos= function() {
        var ret=0;
        for (var i=0; i<8; i++)
        {
            if (ret< this.NowMaxPos[i]) 
            {
                ret= this.NowMaxPos[i];
            }
        }
        return ret;
    }
    this.SecondOf_NowMaxPos= function() {
        var tmp=Array(8);
        for (var i=0; i<8; i++)
        {
            tmp[i]= this.NowMaxPos[i];
        }
        tmp.sort();
        return tmp[6];
    }
    this.PeekCard = function(ccol,rrow) {
        if (ccol>=1 && ccol<=8 &&  rrow>=0 && rrow< this.NowMaxPos[ccol-1]) {
            return arr[ccol-1][rrow];
        }
        return null;
    }
    this.Upd_NowMaxPos= function() {
        for (var i=0; i<8; i++)
        {
            var j=0;
            while ( this.arr[i][j] != null)
            {
                j++;
            }
            this.NowMaxPos[i]=j;
        }
    }
    this.BufferSize= function() {
        return this.MB.count();
    }
    this.PeekBuffer= function(inn) {
        return(this.MB.hand[inn]);
    }
    this.SearchBuffer=function(inn) {
        return( this.MB.Search(inn));
    }
    this.setNumber=function(inn) {
        this.MB=new MyBuffer();
        var i,j,col,pos;
        var wLeft=52;
        //@@? Dim Choose As Random = New Random(inn)
        var deck=new Array(52);
        for (i=0; i<52; i++)
        {
            deck[i]= CardDeck[i];
        }
        for (i=0; i<52; i++)
        {
            j=usefloor(0,100) % wLeft;
            this.arr[i%8][Math.floor(i/8)]= deck[j];
            wLeft--;
            deck[j]= deck[wLeft];
        }
        this.NowMaxPos[0]=7;
        this.NowMaxPos[1]=7;
        this.NowMaxPos[2]=7;
        this.NowMaxPos[3]=7;
        this.NowMaxPos[4]=6;
        this.NowMaxPos[5]=6;
        this.NowMaxPos[6]=6;
        this.NowMaxPos[7]=6;
    }
    this.Peek= function (col) {
        if (col>=1 && col<=8)
        {
            if (this.NowMaxPos[col-1]>0 )
            {
                return this.arr[ col-1][ this.NowMaxPos[col-1] -1 ];
            }
        }
        return null;
    }
    this.Fetch= function(col) {
        var ret=null;
        if (col>=1 && col<=8)
        {
            if (this.NowMaxPos[col-1] >0)
            {
                if (this.arr[ col-1][ this.NowMaxPos[col-1]-1] != null)
                    ret=this.arr[ col-1][ this.NowMaxPos[col-1]-1];
                    this.arr[ col-1][ this.NowMaxPos[col-1]-1]=null;
                    return ret;
            }
        }
        return null;
    }
    this.FetchBuffer= function(thatcard) {
        if (thatcard!=null) 
        {
            if (this.MB.search(thatcard))
            {
                this.MB.remove(thatcard);
                return thatcard;
            }
        }
        return null;
    }
    this.Put= function( thatcard, DstLine) {
        if (this.NowMaxPos[ DstLine-1] <=19) 
        {
            if (thatcard != null && DstLine>=1 && DstLine<=8) 
            {
                this.arr[DstLine-1][ this.NowMaxPos[Line-1] ]=thatcard;
                this.NowMaxPos[Line-1] +=1;
                return true;
            }
        }
        return false;
    }
    this.PutBuffer= function(thatcard) {
        if (this.MB.Available()>0 && this.MB.search(thatcard)==false) 
        {
            this.MB.add(thatcard);
            return true;
        }
        return false;
    }
    this.Pop= function(Line) {
        var that= this.Fetch(Line);
        if (that!=null) 
        {
            if (this.MB.Available()>=1)
            {
                this.MB.add(that);
                return true;
            }
            else if (this.HowManyBlankLines()>=1 )            
            {
                var tmp= this.FirstBlankLine();
                return this.Put(that,tmp);
            }            
        }
        return false;
    }
    this.Move= function(SrcLine, DstLine) {
        var hand1= this.Peek(DstLine);
        var hand2= this.Peek(SrcLine);
        if (hand1!=null && SrcLine>=1 && DstLine!=SrcLine)
        {
            if (hand2!=null)
            {
                if (Problem_rule(hand1,hand2))
                {
                    hand2= this.Fetch(SrcLine);
                    return this.Put(hand2,DstLine);
                }
            }
        }else if (hand1==null)
        {
            hand2= this.Fetch(SrcLine);
            return this.Put(hand2,DstLine);
        }
        return false;
    }
    this.Down= function(thatcard,DstLine) {
        var there= this.FetchBuffer(thatcard);
        if (there==null)
        {
            return false;
        }else
        {
            var upper= this.Peek(DstLine);
            if (upper==null)
            {
                return this.Put(thatcard,DstLine);
            }
        }
        return false;
    }
    this.Available=function() {
        var ret1= this.MB.Available();
        var ret2= this.HowManyBlankLines();
        return (ret1+ret2);
    }
    this.CARDFUNCTION=function (thatcard,delta) {
        if (thatcard==null)
            return null;
        var sz= this.BufferSize();
        if (sz>0)
        {
            for (var x=0; x<sz; x++)
            {
                if (Card_Equal(this.PeekBuffer(x), thatcard))
                    return null;
            }
        }
        var i,j;
        var found=false;
        for (i=0; i<8; i++)
        {
            if (this.NowMaxPos[i] >0)
            {
                for (j=0; j< this.NowMaxPos[i] ; j++) 
                {
                    if (CardEqual(this.arr[i][j], thatcard))
                    {
                        found=true;
                        break;
                    }                    
                }
                if (found)
                    break;
            }
        }
        if (j+delta >=0 && j+delta<=20)
            return this.arr[i][j+delta];
        return null;            
    }
    this.WhereIs= function(thatcard) {
        if (thatcard!=null)
        {
            var i,j;
            for (i=0; i<8; i++)
            {
                for (j= this.NowMaxPos[i]-1; i>=0; i--)
                {
                    if (Card_Equal(thatcard, this.arr[i][j]))
                    {   
                        return (i+1);
                    }
                }                
            }
            return 0;
        }else
            return -1;
    }
    this.CardNum= function() {
        var sum=0;
        for (var i=0; i<8; i++)
        {
            sum += this.NowMaxPos[i];            
        }
        sum += this.MB.count();
        return sum;
    }
    this.POSITION1= function(thatcard) {
        if (thatcard!=null)
        {
            var L= this.WhereIs(thatcard);
            if (L== -1 || L==0)  
                return -1;
            for (var i=0; i< this.NowMaxPos[L-1]; i++)
            {   
                if (Card_Equal(thatcard, this.arr[L-1][i]))
                    return i;
            }                            
        }
        return -1;
    }
    this.POSITION2= function(thatcard, srcLine) {
        if (thatcard != null)
        {
            for (var i=0; i< this.NowMaxPos[length-1]; i++)
            {
                if (Card_Equal(thatcard, this.arr[srcLine-1][i]))
                    return i;
            }
        }
        return -1;
    }
    this.BlankLine= function() {
        var ret= new Array(8);
        var j=0;
        for (var i=0; i<8; i++)
        {
            if (this.NowMaxPos[i]==0)
            {
                ret[j]=(i+1);
                ++j;
            }
        }
        return ret;
    }
    this.OneCardLine= function() {
        var ret= new Array(8);
        var j=0;
        for (var i=0; i<8; i++)
        {
            if (this.NowMaxPos[i]==1)
            {
                ret[j]=(i+1);
                j++;
            }
        }
        return ret;
    }
    this.toString= function() {
        return "@@?";
    }
    this.setExample= function() {
    
        this.MB.setExample();
        this.arr[0][0]=CC("13H");  this.arr[0][1]=CC("12C");  this.arr[0][2]=CC("11H");
        this.arr[0][3]=CC("10C");  this.arr[0][4]=CC("9H");   this.arr[0][5]=CC("8S");  this.arr[0][6]=CC("7D");
        
        this.arr[1][0]=CC("13S");
        
        this.arr[2][0]=CC("2H");
        this.arr[2][1]=CC("6D");
        this.arr[2][2]=CC("5D");
        this.arr[2][3]=CC("11D");
        this.arr[2][4]=CC("2C");
        this.arr[2][5]=CC("8C");
        this.arr[2][6]=CC("9D");
        
        this.arr[3][0]=CC("8H");
        this.arr[3][1]=CC("13D");
        this.arr[3][2]=CC("5H");
        this.arr[3][3]=CC("4C");
        this.arr[3][4]=CC("3D");
        
        this.arr[4][0]=CC("10S");
        this.arr[4][1]=CC("7H");
        this.arr[4][2]=CC("3H");
        this.arr[4][3]=CC("11S");
        this.arr[4][4]=CC("6C");
        this.arr[4][5]=CC("10D");
        this.arr[4][6]=CC("9S");
        
        this.arr[5][0]=CC("12D");
        this.arr[5][1]=CC("11C");
        this.arr[5][2]=CC("10H");
        this.arr[5][3]=CC("9C");
        this.arr[5][4]=CC("8D");
        this.arr[5][5]=CC("7C");
        
        this.arr[6][0]=CC("12H");
        this.arr[6][1]=CC("4H");
        this.arr[6][2]=CC("2D");
        this.arr[6][3]=CC("6S");
        this.arr[6][4]=CC("4S");
        this.arr[6][5]=CC("6H");
        this.arr[6][6]=CC("5S");
        this.arr[6][7]=CC("4D");
        this.arr[6][8]=CC("3C");
        
        this.arr[7][0]=CC("1H");
        this.arr[7][1]=CC("7S");
        this.arr[7][2]=CC("13C");
        this.Upd_NowMaxPos();
    }
}
function Finisher(){
    this.C= null;
    this.D= null;
    this.H= null;
    this.S= null;
    this.Search= function(thatcard) {
        if (thatcard!=null)
        {
            var cmp;
            switch(thatcard.Suit)
            {
            case CLUB:
                cmp= this.C;break;
            case DIAMOND:
                cmp= this.D;break;
            case HEART:
                cmp= this.H;break;
            case SPADE:
                cmp= this.S;break;                      
            }
            if (cmp==null)
                return false;
            else if (cmp.Number>= thatcard.Number)
                return true;
        }
        return false;
    }
    this.add=function(thatcard) {
        if (thatcard!= null)
        {
            var top;
            switch(thatcard.Suit)
            {            
            case CLUB:      
                top=this.C;
                if (top==null || top.Number== thatcard.Number-1 )
                {  this.C=thatcard;return true;
                }
                break;
            case DIAMOND:   
                top=this.D;
                if (top==null || top.Number== thatcard.Number-1)
                {  this.D=thatcard;return true;
                }
                break;
            case HEART:     
                top=this.H;
                if (top==null || top.Number== thatcard.Number-1)
                {   this.H= thatcard; return true;
                }
                break;
            case SPADE:     
                top=this.S;
                if (top==null || top.Number== thatcard.Number-1)
                {   this.S= thatcard; return true;
                }
            }            
        }
        return false;
    }
    this.top= function(thatsuit) {
        if (thatsuit>=CLUB && thatsuit<=SPADE)
        {
            switch(thatsuit)
            {
            case CLUB:
                return this.C;
            case DIAMOND:
                return this.D;
            case HEART:
                return this.H;
            case SPADE:
                return this.S;
            }
        }
        alert("error");
        return null;
    }
    this.need= function(thatsuit) {
        if (thatsuit>=CLUB && thatsuit<=SPADE)
        {
            var top;
            switch(thatsuit)
            {
            case CLUB:
                top=this.C; break;
            case DIAMOND:
                top=this.D; break;
            case HEART:
                top= this.H; break;
            case SPADE:
                top= this.S; break;
            }
            if (top==null)
            {   return CardDeck_GetCard2(1,thatsuit);
            }else if (top.Number==13)
                return null;
            else    
                return CardDeck_GetCard2(top.Number+1, thatsuit);
        }
        alert("error");
        return null;
    }
    this.needed=function(thatcard) {
        if (thatcard!=null)
        {
            var cmpcard= this.need(thatcard.Suit);
            if (cmpcard==null)
                return false;
            else
                return (cmpcard.Number== thatcard.Number);            
        }
        return false;
    }
    this.toString=function() {
        return "@@?";
    }
    this.SafeCardUp=function(thatcard)  {
        if (thatcard!=null)
        {
            if (thatcard.Number==1 || thatcard.Number==2)
                return true;
            if (thatcard.isRed)
            {
                if (this.S==null || this.C==null)
                    return false;
                if (this.S.Number>= thatcard.Number-1 && this.C.Number>= thatcard.Number-1 )
                    return true;
                return false;
            }else //if thatcard.isRed
            {
                if (this.H==null || this.D==null)
                    return false;
                if (this.H.Number>= thatcard.Number-1 && this.D.Nubmer>= thatcard.Number-1 )
                    return true;
                return false;
            }
        }
        return false;
    }
    this.set= function(innC,innD,innH,innS)    {
        this.C=innC;
        this.D=innD;
        this.H=innH;
        this.S=innS;
    }           
    this.setExample= function() {
        this.set( CC("1C"), CC("1D"), null, CC("3S"));
    }
}
function World(){
    this.P=new Problem();
    this.F=new Finisher();
    this.History=new Array(150);
    this.HS=0;
    this.CONNECT= function(upper,lower) {
        if (Problem_rule(upper,lower))
        {
            var str="CONNECT("+ upper.String +","+lower.String +")";
            var dstLine=this.P.WhereIs(upper);
            var srcLine=this.P.WhereIs(lower);
            if (dstLine>=1 && dstLine<=8)
            {
                if (srcLine>=1 && srcLine<=8)
                {
                    var hand= this.P.Fetch(srcLine);
                    var ret=  this.P.Put(hand,dstLine);
                    if (ret)
                    {
                        this.History[this.HS]=str; this.HS++;
                        return true;
                    }
                }else if (srcLine==0)
                {
                    var hand= this.P.FetchBuffer(srcLine);
                    var ret= this.P.Put(hand,dstLine);
                    if (ret)
                    {
                        this.History[this.HS]=str; this.HS++;
                        return true;
                    }
                }
            }            
        }
        return false;
    }
    this.FINISH= function(thatcard) {
        if (thatcard!=null) 
        {
            var hand=null;
            var str="Finish("+thatcard.String+")";
            var sz= this.P.BufferSize();
            for (var i=0; i<sz; i++)
            {
                hand= this.P.PeekBuffer(i);
                if (Card_Equal(thatcard,hand))
                {
                    if (this.F.add(thatcard))
                    {
                        hand= this.P.FetchBuffer(thatcard);
                        this.History[this.HS]=str; this.HS++;
                        return true;
                    }
                }
            }
            for (var i=1; i<=8;i++)
            {
                var hand= this.P.Peek(i);
                if (hand!= null)
                {
                    if (Card_Equal(hand,thatcard))
                    {
                        if (this.F.add(thatcard))
                        {
                            var hand= this.P.Fetch(i);
                            this.History[this.HS]=str; this.HS++;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    this.POP= function(thatcard) {
        if (thatcard!=null)
        {
            if (this.P.BufferSize()<4)
            {
                var str= "POP("+ thatcard.String +")";
                for (var i=1; i<=8; i++)
                {
                    var hand= this.P.Peek(i);
                    if (Card_Equal(hand,thatcard))
                    {
                        if (this.P.Pop(i))
                        {
                            this.History[this.HS]= str; this.HS++;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    this.DOWN=function(thatcard) {
        var dstLine= this.P.FirstBlankLine();
        var sz= this.P.BufferSize();
        for (var i=0; i<sz; i++)
        {
            var hand= this.P.PeekBuffer(i);
            if (Card_Equal(thatcard, hand))
            {
                if (this.P.FethBuffer(i))
                {
                    if (this.P.Put(hand,dstLine))
                        return true;
                }
            }             
        }
        return false;
    }
    this.AutoSafeUp=function() {
        var flag=false, ret=false;
        do
        {
            flag=false;
            var hand;
            var sz= this.P.BufferSize();
            if (sz>0)
            {
                for (var i=0; i<sz; i++)
                {   
                    hand= this.P.PeekBuffer(i);
                    if (hand!= null)                     
                    {
                        if (this.F.SafeCardUp(hand))
                        {
                            if (this.FINISH(hand))
                            {
                                flag=true;
                                ret=true;
                            }
                        }
                    }                                       
                }
            }
            for (var i=1; i<=8; i++)
            {
                hand= this.P.Peek(i);
                if (hand!= null)
                {
                    if (this.F.SafeCardUp(hand))
                    {
                        if (this.FINISH(hand))
                        {
                            flag=true;
                            ret=true;
                        }
                    }
                }
            }
        } while(flag);        
    }
    this.isComplete=function() {
        if (this.F.C.Number==13 && this.F.D.Number==13 && this.F.H.Number==13 && this.F.S.Number==13)
            return true;
        return false;
    }
    this.isDead=function() {
        if (this.isComplete())
            return false;
        //有點難寫
        return false;    
    }
    this.MOVELINE=function (srcLine,dstLine) {
        return false;
    }
    this.HistoryToString=function() {
        var ret="";
        for (var i=0; i< this.HS-1; i++)
        {
            ret += this.History[i];
            ret += ",";
        }
        ret += this.History[ this.HS-1];
        return ret;
    }
    this.setExample= function() {
        //P  F  H  HS
        this.F.setExample();
        this.P.setExample();
        this.History= new Array(150);
        this.HS=0;
    }
}


function init_CardDeck() {
	var i;
	for(i=0; i<52; i++) {
		CardDeck[i]= new card(i);		
	}	
}
function init_MyBuffer() {
    // do nothing
}
function init_Problem(){
    // do nothing
}
function FinisherButton() {
    alert("FK");
}
function BTN() {
    alert("BTN");
}
function Cell(i) {
    alert("Cell"+i);
}
function init_World() {
    thisWorld= new World();
    thisWorld.setExample();
}
function main(){
    var x=document.getElementById("tb").rows[0].cells;
    x[0].innerHTML="NEW CONTENT";

}

init_CardDeck();
init_World();
main();
//</script>