/**
 * Created by Seonin David on 2017/09/02.
 */
const exports = module.exports = {};

exports.select_json =function (_json,arr){
    const conv_data = JSON.parse(_json);
    let data, output, i;
    let final_output = "[";


    for(let x in conv_data){
        data=conv_data[x];
        output="{";
        i=0;
        for(let y in data) {
            if (y == arr[i]) {
                if (i == arr.length - 1) {
                    output += '"' + y + '":"' + data[y] + '"';
                }
                else {
                    output += '"' + y + '":"' + data[y] + '"' + ",";
                }
                i++;
            }
        }
        output+="}";
        if(x===conv_data.length-1){
            final_output+=output;
        }
        else{
            final_output+=output+",";
        }

    }

    final_output+="]";

    let out = JSON.parse(JSON.stringify(final_output));
    let out1;
    out1 = JSON.parse(out);
    return out1;
};