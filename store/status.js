const schemaKey = () => {
    const schemaKeys = {
         member: {
            name: '이름', 
            mobile: '연락처', 
            gender: '성별', 
            age: '나이', 
            address: '주소',
            job: '직업', 
            route: '경로', 
            status: '등록여부'
        },
        payment: {
            paymentDate: '수강료'
        },
        information: {
            classTime: '수강일', 
            position: '악기', 
            timePerWeek: '주간횟수'
        }
    }

    return schemaKeys
}


module.exports = schemaKey
