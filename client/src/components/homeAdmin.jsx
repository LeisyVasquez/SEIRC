import React, {useEffect} from "react";
import api from '../axios/axios';
import { Container, Form } from "react-bootstrap";
import '../styles/home.css';
import {getFromLocal} from '../functions/localStorage'
const HomeAdmin = () => {
    useEffect(() => {
        comprobation();
    }, []);
    
    function comprobation(){
        api.post('/routeComprobation',{typeUser:['administrador']},{headers:{'authorization':`Bearer ${getFromLocal('tokenUser')}`}})
        .then((res)=>{
            if(res.status===201) window.location.href = '/'
        }).catch((err)=>{
            window.location.href = '/'
        });
    }

    return (
        <div className="homeAdmin" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h1 className="mx-auto my-5">Juan Pablo, ¡bienvenido!</h1>
                <img className="mb-5 logo" src="https://github.com/LeisyVasquez/SEIRC/blob/main/client/public/images/logo.png?raw=true" alt="logo" />
                <h1 className="mx-auto my-5">Tutorial administrador</h1>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT0AAACfCAMAAAC85v7+AAABFFBMVEX///9BQUP3fm35yKf7r0H2yKf2kx7vUkHuQjYAAAAyMjTOzs7p6ekrKy46OjyBgYLy2Nr1iwDb29tzc3PckJf++fjqxMj7z8zwXU395uP2dWL5sKb3emj72tXuRTE/P0H/8vH+9OjtMyX82rr+7dv6zaD/+/T5vIH92Kr7rDWwsLCtj3v85MvuSD37xHrz8/NUVFS/v78UFBT4sGfyeXPahI2jo6OPj4/74tGampryZlXuSDX5z7IzNz32o5rIyMhiYmIbGxv4q1rwWUf0kYf51r9+bWL94bxvb29LS0thYWHzfnf3uLH4w774smqBb2KSgHVhV1LkuZtcVFDYsJMlLjjBnoeaj4jlrbLuMhT2mZDVdH6b4xVnAAAMy0lEQVR4nO2d/UPaSBrHE3M5GsTY6tIKQiJCvVtki9quVQjVruLK1t1W7Hq3vf///7h5Ju9kJkmZmc2LfH8AAmEy+fA88zwzmQySxEXDrfXiaavG5+TZNOxfmtVC6mhzK2t4fb2qm3IhZeobt5ka4HC7WlB0tnT9OEN4R3rW588ocyM7fLdFh4dUXc8I3mk161PnINOsZwJvWAZ4yPjOM6F3Xg56pjzMgt5RocOtr2oWgaNWDtNDacv7DOhdlIWeeZQBvX5p6M1W9JbXih6L8kFPL4rMHNLTtzcLopmZP3obmY+WpdW2nj961RW979DK9li0PL2trAaFHBWa3lBb0Vue3mmGo+FYxaNXG3rPQ/RyiGW/NQxsOM9DV5KzXUNfDOzn7l7zvlirBw8zjB10Kh69mYafjrW+VJXRlzXQJXzlAr/UTqHIDfRiEzWMmqNzSbuFr73Xau5b6OPTj/YzagNAMERS07BBX2hVfBjtMq4uxaN3gbAhHZ0MJfkI6CGzupChBVzX3C+eaptDxNfEG9sn+Enbhsf3mv+Int4PUQFHQK8Pm32P3qVmF3ayHVeX4tGTPkIda2AyLj2kjWqA3tAmtY7NUNq2UUXp1bCxIcrHNj0JyrTpDTXT/rB09N4DpHN4CNCDbY9e33mxocMjld65Zl/C/nhk0xsCMJveqbZ1hPcpHT1sMrhZCtC7QK67rpmz2azqOabDjUpv09nttw0EbvO4LwNNm171BBV8IZWQHsSNdexpEXrnx/1+P5beOYHeJdDbMDWcPWJ6W1A8tIclpNfX1rcxswC906DnnjovqjhupvXcoQxFYXqbWnU20+Dj8tGra+YJTj8C9KobgaiBQwpYUDBqyB/h0cQB2Ka3ZQcGCOJDO9xe2vSG2uz4+PgUpTklpId44DbJoYey2/UZvOFnLOeQihw7KZtDrw8wMBHPtTe1c9hNdjIWtOcWpndsZy1guiWkh3Jg/Oxny0cL2TJOg2/tvW+d5u3UTYj9Fu/0xMuW+/jxI6ZX1ZwvrEt+kSQVkp7bjarVoOuFZG/WazV/w33GnTP3hfue91bd293tx8GrWs07TLDIqIpJLy9a0WPRih6LVvRYtKLHohU9Fj0Feo1dfgpPrn0K9NrNFi8190Il559eg0lQQru5xkuFo/fur/3l9Q5KeNL0jGdLy1jRY6D3bEVvRS9WK3osWtFj0YoeixLo7S8Pb5WxfHr209J69glKeMr06nsMwt3Sp0yPXU+Z3qDLoAGU8JTp/fKCQb9ACU+Z3tt/MugtlLCit5xePHl6K8+NVzy9To9BHSjhKdNjVxK9VnO0gzRqtspHrzdgUA9KiKfXvKp4ukqy0sLRE9vuOezGSGn4FY6e0IxlhNFVmtffvl03KwZsjVb0UtLbQbSMq7s9+0h7dztggDtloifQcwHeeDd4sLtKPL780esdTuLoievnYrdthyvTuBrHOW/u6FlKPD12Uei1IEg0FnfeA4OkunrO6B1YSgK9DpOgBAo9hMloR2vUQLHjqhj0DlQliZ6odq+J2rwPzjEaQYq7Y7rxJdCTRbKKCMNLoCcq5oKHujOi2sadf8D6Dj1w5ImeDS8jesj0vrnHaBvGtT+3DIyP0mlLomcJ5RWWpaSgJ8hzW8FWr21UxiMvgEDLR3HdJHrKVCyxgKZKGnrd1wzqQglEes2A4wI91Fn73d2k9zgS6Sk9scw8nSmp6LGLSA8le01/D9xHM9wg0lyanqqqB3wrT1FHSUfvgEmYDYXemncMm17FGNnW+ImB3t/ju07ESKb3B0vU+AOzodBrecdw6I2dyPuOxfb+Ft+1lJT03r5YHl7MdQ1EbxRq9yrjHTeK7DDRU8UvuzxVUtNjsT06PUiWPRRAz/jkbtbp6XIKeqoq3Hd7Smp6TBkLnR5kLF6QRfQMf6zllbF0vofpifbdAyU9vdf/YtBrzIZoSFeV8Tv3GIjeK/+I12NqRzcVPVWw71rfQY9dZHqo4Ru3vT32/N0bMWNU6eiJjbtTJQ29eqfD5zck04MBKjfq7gV3X6tQHTet7Yn03TMlBb0zbJ9nPI5HGaEaBfLjgHaNmOFRh577q9LoCfTdjpJMr6eoFsbX4XBA2tjyFcJ3t7jz3ThmeA/Tq4PrWNi66PRE+W5dTaY3VbqDwQDwWdKv/2bQr3H0mpWo9YHl0YeWMT2oltq11F4cPVG+O12Et0hPv1Es+1o2cK6/+ZFBb+LoYXzjUSDatpvjWHhAD5ItqN9UsQ7o9AT57mKjF6E3+ay49AB0582P/1he8fQwvorR3G2jU62371q4wxZ3PRzRs9zqodp9mVDpCYm7HSXiuGF6kxt4a+oZX+cNA7wkemstPJVgbIydh6TJBIie99sOuov4QrYnwHejjd4CPRueotj1s0TTcy5L+oqdSbBAD+oZwheiJ8B3o41emJ5+7+C1nB9X2RNMDxHZcdHtJLADenUUMrxmZQFfmB533+2R4AXoefCw7+KURRLZ7nlQms1RM8UENNv2cEIwcGv6eUKzPc6+WyfC8+npD75jqxZ+bUnCbe97ZEcNwOfX9GZCoacqXH13SggZAXr6bL7wiYo6G3mjh5MGNXgiHr5FeirPS2wdxVJIcuiZEXioltLf4rnfQ28vegL3Ewo9Pj1NW5ZFND2HnilH4UHLkTfbI0Q+1cEXoady6WlinaldIjybHhEeRK3c0TuI1lN90Mn0+F1iU7pk08P0TPMroVL1PNIjdZfmDyaZnsWp6TtTKKYH9IjwFKhqDumRslYV/iSHQE/p8sn6LItOz9RJ8Ox0KYf0SD2mOcJH8lx1ygNfR+mSIy7QI8Jz4lUO6UWHKAEfciAiPctiz5p7MfT+jMLz+zl5pEfsNIH1EeipqD/MHDo61KChHD4S3vTsPZf0SJFD+WrKComexZ72xdBTCR/4jUU+6ZHxzUi2N52yjxcc0OkR+m+Bw+WUHhkfiZ414NBjs+j04uDllh4RH8lzVR70ptSoEVGomRB4XYONXlp8yoBDynyWlp56E5pLIO6aGis98nAliR57ytdR09FT74uzosh/CH3zCD5Ej32o5YA2SBDW/EEvDr1bwqBa1Ph40JOoPbXQoR90/rOARk1eGu2FSt7WZdLgRiRqcBinmlrkoeWQ7nX+c6jqbAu/RlaB9bWtEwfWFj2XxzBVT6WMjgaEL7EUarVqc0Y4qQXbUzgcqq4k0rNHmQtFT9bvCSey4Lk8jpUIb27/EXex6MmTL6RzCdDjM8RHvBQe1L09qaZg9OQJaZTDh2fxCLnkUbGgHp1LU0WjR2z6fHwWn6vilIvhvumZxaSX4LsWpwtr8Z2Nr+5FZSK9xs8/ZKf/xtOTdWKL7lkfnykFxG61pxs9Sq/tzYx9+Vyqc1faiv/sVmfhfZfe5DDW+JigeYpt+DzTC9H7y70D+eXz3asd3kpbcZteYw0WgW1f+++79Mgtn4OP21yquJTlwSTRM8ZO5+jl8w/jCm+lrTfQq+8aBgLX+jCK0os1Pm7TMWJylsA8uBC9yk/2bTxZ02uPxpXxdb3RJNKTJ/Swy202Bnn+HugxMIkwTK9SMb5lT+/3fbT7+PpVq/XBvyk6QE+/odPjBI80BcTWXDbp9PZzQW8cS4/ou1yDhkTNWeBSKI1eTjy38clwPJdMT45elObc7EnSgAjPmYJEiRr2qBCit29w1vg76EnSq6t9FDXWyO0eaRKYQ4/f/FtizvJVDt80QslYGq+4K221nXzvDpKVRuDuotDdLqY+J8DjOIUvuBqBr5g7TAPZ8g8vs9P/nEosptfhe4VM+THCDokbPHLOkur+3PrzDBVZKY1ID1lfBB3fucukzprou5vFKbqajboonlOXiTlLiehF4PFs9iRiZ63c9LiuDURo+EpNj2fQIHbWSk2P781qhAHmUtPjGTQkUmetzPT4Bg1SzlJmerxv0o121spMj/tSminWxOB9SFFKpMd/dYJIzrJIr3pRK4huE22Pc9Ag5CyL9OTqRkEUhif0HklXkc5ahF5RRaDHf1WWxZylxPQErL8cylnUUtMTsKRNKGdB1l1eelyHp1yF6EX/IaKwMmeKZYkNGlI4Z0H0HktD736BnpClvIINn9pV5mZyxQqhyRdlKjpohBs+dap6E/eKrsmjOhDb08AKdtYGpQkb5gPcDxmkJ2YJw2DDB7evyaUwvsmhMg3TE7Nif7Cz1h0o5Ygb+r2iDrqhdk8IvNAAsxVdBbCQgpkY00Eo5Ir6p5dgZw0vFfe56Ph0BM8ahB1XRK4MCjV8eDm2wz/15CrmVubkYQ6rGoYcV9ia1aGurr1E5vxmMilm8DD1yezQXq4y3E8T9Tcv4a4u4EPmNz+8mWVNYhndf3lUUd6Kz2KpZu//1oSPyDkjGxMAAAAASUVORK5CYII=" alt="logo" />
                <a href="/homeAdmin" className="d-block mt-5">Documentación administrador</a>
            </Container>
        </div>
    );   
}

export default HomeAdmin;